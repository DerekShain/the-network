import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  posts: [],
  profile: {},
  ads: [],
  likes: [],
  profiles: [],
  next: '',
  previous: '',
  current: 1
})
