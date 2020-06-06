<template>
 <section>
     <image-uploader
         :preview="true"
         :maxWidth="512"
         :className="['fileinput', { 'fileinput--loaded': hasImage }]"
         :debug="1"
         :autoRotate="true"
         outputFormat="file"
         accept="image/*"
         @input="setImage"
     >
         <label for="fileInput" slot="upload-label">
             <figure class="d-flex justify-center align-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                     <path class="path1" d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"></path>
                 </svg>
             </figure>
             <span class="upload-caption d-flex justify-center align-center">
                {{ hasImage ? 'Click to Replace Image' : 'Click to Upload Image' }}
             </span>
         </label>
     </image-uploader>
     <transition name="fade">
         <div class="file-error" v-if="!validFile">
             Invalid image file!
         </div>
     </transition>
 </section>
</template>

<script>
import ImageUploader from 'vue-image-upload-resize'

export default {
  name: 'UploadImage',
  components: {
    ImageUploader
  },
  data: () => ({
    hasImage: false,
    validFile: true
  }),
  methods: {
    validUploadedFile (fileType) {
      this.validFile = fileType.split('/')[0] === 'image'
    },
    setImage (file) {
      this.hasImage = true
      this.validUploadedFile(file.type)

      const uploadData = {
        'image': file,
        'validImage': this.validFile
      }
      this.$emit('setImage', uploadData)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/styles/components/uploadImage';
</style>
