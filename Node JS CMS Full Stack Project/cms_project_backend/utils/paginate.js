const paginate = async(model,query={},reqQuery={},options={})=>{
  const{page=1,limit=2,sort='-createdAt'} = reqQuery
  const paginateOptions={
    page:parseInt(page),
    limit:parseInt(limit),
    sort,
    ...options
  }
  try {
    const result = await model.paginate(query,paginateOptions)
    return {
      data:result.docs,
      pagination:{
        page:result.page,
        prevPage:result.prevPage,
        nextPage:result.nextPage,
        currentPage:result.page,  
        counter:result.pagingCounter,
        hasNextPage:result.hasNextPage,
        hasPrevPage:result.hasPrevPage,
        limit:result.limit,
        totalDocs:result.totalDocs,
        totalPages:result.totalPages

      }
    }
  } catch (error) {
    console.log("pagination error ", error.message)
  }
}


module.exports = paginate;