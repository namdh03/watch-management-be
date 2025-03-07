import { isValidObjectId, Types } from 'mongoose'

import { Pagination } from '~/constants/enum'
import HTTP_STATUS from '~/constants/httpStatus'
import { WATCH_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/errors'
import { CommentWatchReqBody } from '~/models/requests/Comment.requests'
import { SearchWatchQuery } from '~/models/requests/Search.requests'
import { WatchReqBody } from '~/models/requests/Watch.requests'
import Watch from '~/models/schemas/Watch.schema'

import brandService from './brand.service'

class WatchService {
  async getAllWatches() {
    return await Watch.aggregate([
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brand'
        }
      },
      {
        $addFields: {
          brand: {
            $map: {
              input: '$brand',
              as: 'brand',
              in: {
                _id: '$$brand._id',
                brandName: '$$brand.brandName'
              }
            }
          },
          commentCount: {
            $size: '$comments'
          },
          averageRating: {
            $avg: '$comments.rating'
          }
        }
      },
      {
        $unwind: '$brand'
      },
      {
        $project: {
          comments: 0,
          watchDescription: 0
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      }
    ])
  }

  async getWatches() {
    const watches = await Watch.find(
      {},
      {
        comments: 0,
        watchDescription: 0
      }
    )
      .skip((Pagination.DefaultPage - 1) * Pagination.DefaultLimit)
      .limit(Pagination.DefaultLimit)
      .populate('brand', 'brandName')
    const total = await Watch.countDocuments()
    const totalPages = Math.ceil(total / Pagination.DefaultLimit)

    return { watches, totalPages }
  }

  async createWatch(body: WatchReqBody) {
    const brand = await brandService.getBrandById(body.brandId)

    return await Watch.create({
      ...body,
      brand: brand.id
    })
  }

  async getWatchById(watchId: string) {
    // Handle for server side rendering
    if (!isValidObjectId(watchId)) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: WATCH_MESSAGES.WATCH_ID_MUST_BE_A_VALID_ID
      })
    }

    const watch = await Watch.findById(watchId)
      .populate({
        path: 'brand',
        model: 'Brand'
      })
      .populate({
        path: 'comments.author',
        model: 'Member',
        select: {
          password: 0
        }
      })

    if (!watch) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: WATCH_MESSAGES.WATCH_ID_DOES_NOT_EXIST
      })
    }

    return watch
  }

  async updateWatch(watchId: string, body: WatchReqBody) {
    const brand = await brandService.getBrandById(body.brandId)

    return await Watch.findOneAndUpdate(
      {
        _id: watchId
      },
      {
        $set: {
          ...body,
          brand: brand.id
        }
      },
      {
        returnDocument: 'after'
      }
    )
  }

  async deleteWatch(watchId: string) {
    const result = await Watch.deleteOne({
      _id: watchId
    })

    if (!result.deletedCount) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.BAD_REQUEST,
        message: WATCH_MESSAGES.WATCH_ID_DOES_NOT_EXIST
      })
    }

    return result
  }

  async searchWatch(query: SearchWatchQuery) {
    const brand = query.brand && (await brandService.getBrandIdByName(query.brand))
    const match = {
      ...(query.name && {
        watchName: {
          $regex: query.name,
          $options: 'i'
        }
      }),
      ...(brand && {
        brand: brand._id
      })
    }

    const [watches, total] = await Promise.all([
      Watch.aggregate([
        {
          $match: match
        },
        {
          $lookup: {
            from: 'brands',
            localField: 'brand',
            foreignField: '_id',
            as: 'brand'
          }
        },
        {
          $addFields: {
            brand: {
              $map: {
                input: '$brand',
                as: 'brand',
                in: {
                  _id: '$$brand._id',
                  brandName: '$$brand.brandName'
                }
              }
            },
            commentCount: {
              $size: '$comments'
            },
            averageRating: {
              $avg: '$comments.rating'
            }
          }
        },
        {
          $unwind: '$brand'
        },
        {
          $project: {
            comments: 0,
            watchDescription: 0
          }
        },
        {
          $sort: {
            createdAt: -1
          }
        },
        {
          $skip: ((Number(query.page) || Pagination.DefaultPage) - 1) * Number(query.limit || Pagination.DefaultLimit)
        },
        {
          $limit: Number(query.limit || Pagination.DefaultLimit)
        }
      ]),
      Watch.countDocuments(match)
    ])

    const totalPages = Math.ceil(total / Number(query.limit || Pagination.DefaultLimit))

    return {
      watches,
      totalItems: total,
      totalPages
    }
  }

  async checkExistedWatchByBrandId(brandId: string) {
    return await Watch.exists({
      brand: brandId
    })
  }

  async checkExistedWatchByAuthorId(watchId: string, authorId: string) {
    return await Watch.exists({
      _id: watchId,
      'comments.author': authorId
    })
  }

  async findByIdAndAddComment(watchId: string, authorId: string, body: CommentWatchReqBody) {
    const watch = await Watch.findByIdAndUpdate(
      {
        _id: watchId
      },
      {
        $push: {
          comments: {
            ...body,
            author: authorId
          }
        }
      },
      {
        returnDocument: 'after'
      }
    )
      .populate({
        path: 'brand',
        model: 'Brand'
      })
      .populate({
        path: 'comments.author',
        model: 'Member',
        select: {
          password: 0
        }
      })

    return watch
  }

  async findByIdAndDeleteComment(commentId: string, authorId: string) {
    // Ensure commentId and authorId are of type ObjectId
    const commentObjectId = new Types.ObjectId(commentId)
    const authorObjectId = new Types.ObjectId(authorId)

    const watch = await Watch.findOneAndUpdate(
      {
        'comments._id': commentObjectId,
        'comments.author': authorObjectId
      },
      {
        $pull: {
          comments: {
            _id: commentObjectId
          }
        }
      }
    )

    return watch
  }

  async checkExistedCommentByAuthorId(commentId: string, authorId: string) {
    return await Watch.exists({
      'comments._id': commentId,
      'comments.author': authorId
    })
  }
}

const watchService = new WatchService()

export default watchService
