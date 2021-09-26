
export class Profile {
  constructor(data) {
    this.email = data.email
    this.name = data.name
    this.img = data.picture
    this.bio = data.bio
    this.coverImg = data.coverImg
    this.github = data.github
    this.linkedin = data.linkedin
    this.resume = data.resume
    this.id = data.id
    this.class = data.class
    this.graduate = data.graduated
    this.likeIds = data.likeIds
  }
}
