<template>
  <form>
    <div class="form-row">
      <div class="form-group col-md-4">
        <label for="name">Name</label>
        <input v-model="form.name" type="text" class="form-control" id="name" placeholder="The name of the car">
      </div>
      <div class="form-group col-md-4">
        <label for="name">Price</label>
        <input v-model="form.price" type="text" class="form-control" id="price" placeholder="The price of the car">
      </div>
      <div class="form-group col-md-4">
        <label for="user_id">Owner</label>
        <select v-model="form.user_id" class="form-control" id="user_id">
          <option v-for="user in users" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <span v-on:click="submit" class="btn btn-primary" style="cursor: pointer;">
        <span v-if="form.id">Update the car {{ form.id }}</span>
        <span v-else>Create the car</span>
      </span>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'car-form',
    props: ['edit'],
    data () {
      return {
        form: this.getDefault()
      }
    },
    watch: {
      edit () {
        this.form = this.getDefault()
      }
    },
    methods: {
      getDefault () {
        if (this.edit !== null) {
          let form = JSON.parse(JSON.stringify(this.edit)) // Dirty hack for cloning object
          form.user_id = form.user.id
          delete form.user
          return form
        } else {
          return {
            name: '',
            price: '',
            user_id: this.$store.getters['users/all'][0].id
          }
        }
      },
      submit () {
        this.$emit('sent');

        if (this.form.id) {
          this.$store.dispatch('cars/update', this.form)
        } else {
          this.$store.dispatch('cars/create', this.form)
        }
      }
    },
    computed: {
      users () {
        return this.$store.getters['users/all']
      }
    }
  }
</script>

<style>
  form {
    margin-bottom: 30px;
  }
</style>