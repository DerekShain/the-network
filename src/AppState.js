import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  posts: [],
  pd: {},
  profile: {},
  ads: [],
  likes: [],
  profiles: [],
  next: '',
  previous: '',
  current: 1,
  total: 0,
  data: {
    page: 0,
    newer: '',
    older: ''
  }
})
