export class Post {
  constructor(data) {
    this.body = data.body
    this.img = data.imgUrl
    this.creatorId = data.creatorId
    this.likes = data.likeIds
    this.id = data.id
    this.creator = data.creator
    this.updatedAt = data.updatedAt
  }
}
