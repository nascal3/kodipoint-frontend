const userProfileAvatar = {
  data: () => ({
    placeholderImage: require(`@/assets/images/avatar.jpg`)
  }),
  methods: {
    imageSource (userInfo) {
      if (!userInfo || !userInfo.avatar) return this.placeholderImage
      const baseURL = process.env.BASE_URL
      return `${baseURL}/file${userInfo.avatar}`
    }
  }
}

export default userProfileAvatar
