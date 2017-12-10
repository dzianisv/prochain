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
                                <v-text-field v-model="model.country" label="Country" persistent-hint hint="Input country" />
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="model.city" label="City" persistent-hint hint="Input city" />
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="model.address" label="Address" persistent-hint hint="Input street address" />
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Name" v-model="model.userName" persistent-hint></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Email" v-model="model.email" persistent-hint hint="Input an organisation contanct information"></v-text-field>
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
                                        :items="['Business', 'Finance', 'Government', 'Politic', 'Sport', 'Society', 'Education', 'Tourism', 'Ecology', 'IT', 'Fashion', 'Party', 'Exhibition']"
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="$emit('close')">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
  import FileInput from '../../shared/FileInput'
  import store from '@/store'

  export default {
    props: ['show'],
    data () {
      return {
        model: {
          country: 'Spain',
          city: 'Madrid',
          address: 'Unknown street, 1',
          description: '![blochcain hackhathon](https://i.ytimg.com/vi/CPxoyj-SAQk/hqdefault.jpg "Blockhain hackhathon")',
          name: store.state.user.username,
          category: ['IT'],
          title: 'Blockchain Hackhathon'
        }
      }
    },
    methods: {
      save (data) {
        console.log('Creating event', this.model);
        let tags = [this.model.city, this.model.country].concat(this.model.category.slice())
        tags = tags.map(e => e.toLowerCase())

        store.createEvent(this.model.title, this.model.description, tags)
      },
      getUploadedFile (e) {
        this.image = e
      }
    }
  }
</script>
