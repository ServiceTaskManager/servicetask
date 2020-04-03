<template>
  <div v-bind="$attrs">
    <q-scroll-area class="fit" style="padding-bottom: 50px;" ref="scrollArea">
      <q-chat-message v-for="m in messages" :key="m.id"
        :name="m.created_by === $user.data.id ? 'me' : $users.data[m.created_by].name"
        :text="[m.message]"
        :sent="m.created_by === $user.data.id"
        :stamp="$moment(m.created_at).format('HH:mm')">
        <template v-slot:avatar>
          <user-avatar :user="$users.data[m.created_by]"
            size="40px" class="q-mx-sm" />
        </template>
      </q-chat-message>
    </q-scroll-area>
    <div class="full-width absolute-bottom">
      <q-form @submit="send" class="row">
        <q-input v-model="message"
          @input="scrollToBotoom"
          label="Type your message here..."
          dense
          type="text"
          class="q-px-sm col-grow">
        </q-input>
        <q-btn type="submit"
          icon="send"
          color="orange"
          class="col-auto"
          flat dense round />
      </q-form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Discussion',
  props: {
    topic: {
      type: String,
      default: undefined,
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {
    messages () {
      let messages = this.$store.getters['messages/filter']([['topic', '==', this.topic]])
      return messages.sort((a, b) => {
        if (moment(a.created_at).isBefore(b.created_at)) return -1
      })
    }
  },
  methods: {
    send () {
      if (this.message) {
        this.$store.dispatch('messages/set', { message: this.message, topic: this.topic })
        this.message = ''
      }
    },
    scrollToBotoom () {
      console.log('down')
      this.$refs.scrollArea.setScrollPosition(this.$refs.scrollArea.getScrollTarget().firstChild.clientHeight + 100)
    }
  },
  mounted () {
    this.scrollToBotoom()
  },
  watch: {
    messages: function () {
      this.scrollToBotoom()
    }
  },
  components: {
    UserAvatar: () => import('../user/UserAvatar')
  }
}
</script>
