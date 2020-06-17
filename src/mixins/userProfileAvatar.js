const userProfileAvatar = {
  data: () => ({
    placeholderImage: require(`@/assets/images/avatar.jpg`)
  }),
  methods: {
    imageSource (imagePath) {
      if (!imagePath) return this.placeholderImage
      const baseURL = process.env.BASE_URL
      return `${baseURL}/file${imagePath}`
    }
  }
}

export default userProfileAvatar
