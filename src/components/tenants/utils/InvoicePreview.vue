<template>
    <section>
        <div class="invoice-preview">
            image
        </div>
        <v-btn small class="btn-text" color="primary">
            Send
            <v-icon right>mdi-send</v-icon>
        </v-btn>
    </section>
</template>

<script>
export default {
  name: 'InvoicePreview'
}
</script>

<style lang="scss" scoped>
 section {
     position: relative;
     width: 100%;
     height: 100%;
     margin-left: 5px;

     .invoice-preview {
         background-color: $white;
         width: 95%;
         height: 100%;
     }
     button {
         position: absolute;
         bottom: 1.1rem;
         right: 1.1rem;
     }
 }
</style>
