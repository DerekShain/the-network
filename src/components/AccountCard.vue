<template>
  <div class="card">
    <router-link :to="{name: 'Profile', params: {id: account.id}}" class="selectable">
      <div class="card-header" :style="{backgroundImage: `url(${account.picture})`}">
        <div class="card-header-slanted-edge">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 200"><path class="polygon" d="M-20,200,1000,0V200Z" /></svg>
        </div>
      </div>
    </router-link>
    <div class="card-body">
      <h2 class="name">
        Hey, {{ account.name }} !
      </h2>
      <div class="bio">
        <div class="btn text-success lighten-30 selectable text-uppercase" type="button" data-bs-toggle="modal" data-bs-target="#post-form">
          <b>Create a Post</b>
        </div>
        <Search />
      </div>
    </div>

    <div class="card-footer text-center">
      <router-link :to="{ name: 'Home' }" class="btn text-success lighten-30 selectable text-uppercase">
        Home
      </router-link>
      <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
        About
      </router-link>
      <router-link :to="{ name: 'Account' }" class="btn text-success lighten-30 selectable text-uppercase">
        Edit
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { postsService } from '../services/PostsService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const query = ref('')
    onMounted(async() => {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      query,
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      total: computed(() => AppState.total),
      current: computed(() => AppState.current),
      profile: computed(() => AppState.profile)
    }
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Exo+2:300,400,700);
body{
  padding:0;
  margin:0;
  font-size:14px;
  font-family: "Exo 2", sans-serif;
  color: #333;
}

.card{
  position: relative;
  width: 315px; /* Remove for full width */
  height: 450px; /* Remove for full width */
  margin:30px auto;
  box-shadow: 0 0 100px rgba(0,0,0, .3);
}
.card-header{
  position: relative;
  height: 220px;
  background-size: cover;
  background-position: top;
}

.card-header-bar{
  position: absolute;
  top:0;
  width: 100%;
  z-index: 1;
  width: 100%;
}

.sr-only{
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0,0,0,0);
  border: none;
  overflow: hidden;
}

svg .polygon{
  fill: #fff;
}
.card-header-slanted-edge{
  position: absolute;
  bottom: -3px;
  z-index: 1;
  width: 100%;
  right:0;
  left:0;
}

.btn-follow{
  position: absolute;
  top: -15px;
  right: 25px;
  width: 45px;
  height: 45px;
  background: linear-gradient(to left, #2D77C1, #68FAC2);
  border-radius:100%;
  box-shadow: 0 10px 15px rgba(110,221,235, .53);
}

.btn-follow:after{
  content: '';
  position:absolute;
  background: url(https://res.cloudinary.com/dj14cmwoz/image/upload/v1491077480/profile-card/images/add.svg) no-repeat;
  width:17px;
  height: 17px;
  left: 50%;
  top:50%;
  transform: translate(-50%, -50%);
}

.card-body{
  text-align:center;
  padding-left: 10px;
}

.name{
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0 auto;
}

.job-title{
  font-size: 14px;
  font-weight: 300;
  margin-top: 5px;
  color: #919191;
}

.bio{
  font-size: 14px;
  color: #7B7B7B;
  font-weight: 300;
  margin: 10px auto;
  line-height: 20px;
}

.social-accounts img{
  width: 15px;
}

.social-accounts a{
  margin-left: 10px;
}
.social-accounts a:first-child{
  margin-left: 0;
}

.card-footer{
  /*position:fixed; /* Full card width/height */
  position: absolute; /* Fixed card width/height */

  left: 0;
  width: 100%;
  bottom: 20px;
}
.stat{
  box-sizing: border-box;
  width: calc(100% / 3);
  float: left;
  text-align: center;
  border-left: 1px solid #EBEBEB;
}
.stat .label{
  display: block;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 11px;
  letter-spacing: 1px;
  color: #95989A;
}

.stat .value{
  display: block;
  font-weight: 700;
  font-size:20px;
  margin-top: 5px;
}

</style>
