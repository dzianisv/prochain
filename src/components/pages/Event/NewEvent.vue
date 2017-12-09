<template>
    <v-layout row justify-center>
        <v-dialog v-model="show" persistent max-width="800px">
            <v-card>
                <v-card-title>
                    <span class="headline">New Event</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field v-model="model.title" label="Title" required />
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="model.location" label="Location" persistent-hint hint="Input location of event" />
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Name" v-model="model.userName" persistent-hint required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Email" v-model="model.email" required persistent-hint hint="Input an organisation contanct information"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Image" v-model="model.image_url" required persistent-hint hint="Image url"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Description" v-model="model.description" textarea required persistent-hint
                                              hint="More information about your event"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-select
                                        label="Category"
                                        multiple
                                        autocomplete
                                        chips
                                        v-model="model.category"
                                        :items="['Business', 'Politic', 'Sport', 'Society', 'Education', 'Tourism', 'Ecology', 'IT', 'Fashion', 'Party', 'Exhibition']"
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="show = false">Close</v-btn>
                    <v-btn color="blue darken-1" v-bind:disabled="!model.terms" flat @click.native="save()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
  import FileInput from '../../shared/FileInput'
  import store from '@/store'

  export default {
    props: ['show', 'petitions'],
    components: { FileInput },
    data () {
      return {
        model: { terms: false }
      }
    },
    methods: {
      save (data) {
        let formData = new FormData()
        formData.name = 'petition'

        formData.set('image', this.image)
        formData.set('title', this.model.title)
        formData.set('location', this.model.location)
        formData.set('userName', this.model.userName)
        formData.set('email', this.model.email)
        formData.set('description', this.model.description)
        formData.set('priority', this.model.priority)
        formData.set('category', this.model.category)

        store.createEvent(this.model)
      },
      getUploadedFile (e) {
        this.image = e
      }
    }
  }
</script>
