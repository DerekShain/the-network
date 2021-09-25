export class Post {
  constructor(postData) {
    this.body = postData.body
    this.img = postData.imgUrl
    this.creatorId = postData.creatorId
    this.likes = postData.likeIds
    this.id = postData.id
    this.creator = postData.creator
    this.updatedAt = postData.updatedAt
  }
}
