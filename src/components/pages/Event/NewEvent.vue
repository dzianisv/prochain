<template>
    <v-layout row justify-center>
            <v-card>
                <v-card-title>
                    <span class="headline">New Event</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field v-model="model.title" label="Title" persistent-hint hint='Brief event description' required />
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="model.address" label="Location" persistent-hint hint="Input event location" />
                            </v-flex>

                            <v-flex xs12 md6>
                                 <v-date-picker v-model="model.date"></v-date-picker>
                            </v-flex>
                            <v-flex xs12 md6>
                                 <v-time-picker format='24hr' v-model="model.time"></v-time-picker>
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
                    <v-alert color="error" icon="warning" value="true" v-if="err">
                        {{err}}
                    </v-alert>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="cancel">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save()">Save</v-btn>
                </v-card-actions>
            </v-card>
    </v-layout>
</template>

<script>
import FileInput from "../../shared/FileInput";
import store from "@/store";
import moment from "moment";

export default {
  props: ["show"],
  data() {
    return {
      model: {
        country: "",
        city: "",
        address: "",
        description: "",
        name: store.state.user.username,
        category: [],
        title: "",
        date: moment().format("YYYY-MM-DD"),
        time: moment().format("HH:mm")
      },
      err: null
    };
  },
  methods: {
    save(data) {
      console.log("Creating event", this.model);
      let tags = [this.model.city, this.model.country].concat(
        this.model.category.slice()
      );
      tags = tags.map(e => e.toLowerCase());

      console.log("New event", `${this.model.date} ${this.model.time}`);

      store
        .createEvent(this.model.title, this.model.description, tags, {
          country: this.model.country,
          city: this.model.city,
          address: this.model.address,
          time: moment(`${this.model.date} ${this.model.time}`).unix()
        })
        .then(() => {
            this.$router.go(-1)
        })
        .catch(err => {
          this.err = err;
        });
    },
    cancel() {
        this.$emit('close');
        this.$router.go(-1);
    },
    getUploadedFile(e) {
      this.image = e;
    }
  }
};
</script>
