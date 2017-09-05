<template>
  <form>
    <div class="form-row">
      <div class="form-group col-md-4">
        <label for="name">Name</label>
        <input v-model="form.name" type="text" class="form-control" id="name" placeholder="The name of your user">
      </div>
      <div class="form-group col-md-4">
        <label for="name">Email</label>
        <input v-model="form.email" type="email" class="form-control" id="email" placeholder="The email of your user">
      </div>
      <div class="form-group col-md-4">
        <label for="name">Password</label>
        <input v-model="form.password" type="password" class="form-control" id="password">
      </div>
    </div>
    <div class="form-group">
      <span v-on:click="submit" class="btn btn-primary" style="cursor: pointer;">
        <span v-if="form.id">Update the user {{ form.id }}</span>
        <span v-else>Create the user</span>
      </span>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'user-form',
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
          return JSON.parse(JSON.stringify(this.edit)) // Dirty hack for cloning object
        } else {
          return {
            name: '',
            email: '',
            password: '',
          }
        }
      },
      submit () {
        this.$emit('sent');

        if (this.form.id) {
          this.$store.dispatch('users/update', this.form)
        } else {
          this.$store.dispatch('users/create', this.form)
        }
      }
    }
  }
</script>

<style>
  form {
    margin-bottom: 30px;
  }
</style>