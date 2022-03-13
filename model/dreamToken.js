const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var idValidator = require('mongoose-id-validator');
const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'data',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },

        tokenAmount: { type: Schema.Types.Decimal128, },

        tokenInUsd: { type: Schema.Types.Decimal128, },
    },
    {
        timestamps: {
            createdAt: 'createdAt'
        }
    }
);

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const dreamTokenCollection = mongoose.model('dreamTokenCollection', schema, 'dreamTokenCollection');
module.exports = dreamTokenCollection;