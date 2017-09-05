<template>
  <div id="app">
    <div class="row">
      <div class="col-md-12 heading">
        <h1>Laravel Vuex Example</h1>
        <p>These two tables are automatically loaded from the laravel example project through the vuex stores.
        All database modifications executed with the eloquent API are sync by laravel Echo. Try some actions here or on
        the server side :)</p>
      </div>
      <div class="col-md-6">
        <h3>Users <button type="button" style="float: right;" v-on:click="createUser()" class="btn btn-link">Create</button></h3>

        <user-form v-if="forms.user" :edit="edit.user" v-on:sent="forms.user = false"></user-form>

        <table class="table">
          <thead class="thead-inverse">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th class="actions-col"></th>
            </tr>
          </thead>
          <tr v-for="user in users">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td class="actions-col">
              <button type="button" v-on:click="editUser(user)" class="btn btn-link">Update</button>
              <button type="button" v-on:click="deleteUser(user)" class="btn btn-link">Delete</button>
            </td>
          </tr>
        </table>
      </div>
      <div class="col-md-6">
        <h3>Cars <button type="button" style="float: right;" v-on:click="forms.car = !forms.car" class="btn btn-link">Create</button></h3>

        <car-form v-if="forms.car" :edit="edit.car" v-on:sent="forms.car = false"></car-form>

        <table class="table">
          <thead class="thead-inverse">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Owner</th>
              <th></th>
            </tr>
          </thead>
          <tr v-for="car in cars">
            <td>{{ car.id }}</td>
            <td>{{ car.name }}</td>
            <td>{{ car.price }}</td>
            <td>{{ car.user.name }}</td>
            <td class="actions-col">
              <button type="button" v-on:click="editCar(car)" class="btn btn-link">Update</button>
              <button type="button" v-on:click="deleteCar(car)" class="btn btn-link">Delete</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import UserForm from "./forms/user-form.vue"
  import CarForm from "./forms/car-form.vue"

  export default {
    name: 'app',
    components: {
      UserForm,
      CarForm
    },
    data () {
      return {
        forms: {
          user: false,
          car: false
        },
        edit: {
          user: null,
          car: null
        }
      }
    },
    computed: {
      users () {
        return this.$store.getters['users/all']
      },
      cars () {
        return this.$store.getters['cars/all']
      }
    },
    methods: {
      createUser() {
        this.edit.user = null
        this.forms.user = true
      },
      editUser (user) {
        this.edit.user = user
        this.forms.user = true
      },
      deleteUser (user) {
        this.$store.dispatch('users/delete', user)
      },
      createCar() {
        this.edit.car = null
        this.forms.car = true
      },
      editCar (car) {
        this.edit.car = car
        this.forms.car = true
      },
      deleteCar (car) {
        this.$store.dispatch('cars/delete', car)
      },
    },
    mounted () {
      this.$store.dispatch('users/fill')
      this.$store.dispatch('cars/fill')
    }
  }
</script>

<style>
  #app {
    padding-top: 60px;
    max-width: 1440px;
    margin: auto;
  }

  .heading {
    margin-bottom: 50px;
  }

  .heading p {
    width: 50%;
    text-align: center;
    margin: auto;
  }

  h1 {
    text-align: center;
    margin-bottom: 30px;
  }

  h3 {
    margin-bottom: 30px;
  }

  .actions-col {
    white-space: nowrap;
    width: 1px;
  }
</style>
