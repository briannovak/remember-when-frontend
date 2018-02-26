import Vue from "vue"
import Router from "vue-router"
import Home from "@/components/Home"
import Remember from "@/components/Remember"
import Friends from "@/components/Friends"
import Events from "@/components/Events"
import About from "@/components/About"
import AddFriend from "@/components/AddFriend"
import UpdateFriend from "@/components/UpdateFriend"
import RemoveFriend from "@/components/RemoveFriend"
import AddEvent from "@/components/AddEvent"
import RemoveEvent from "@/components/RemoveEvent"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/remember",
      name: "Remember",
      component: Remember
    },
    {
      path: "/friends",
      name: "Friends",
      component: Friends
    },
    {
      path: "/events",
      name: "Events",
      component: Events
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/add-friend",
      name: "AddFriend",
      component: AddFriend
    },
    {
      path: "/update-friend",
      name: "UpdateFriend",
      component: UpdateFriend
    },
    {
      path: "/remove-friend",
      name: "RemoveFriend",
      component: RemoveFriend
    },
    {
      path: "/add-event",
      name: "AddEvent",
      component: AddEvent
    },
    {
      path: "/remove-event",
      name: "RemoveEvent",
      component: RemoveEvent
    }
  ]
})
