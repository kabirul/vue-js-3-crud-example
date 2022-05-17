<template>
  <div class="col-md-6 offset-md-3">
  <div v-if="currentBlog">
    <h4>Edit Blog</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentBlog.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentBlog.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentBlog.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="btn btn-primary mr-2"
      v-if="currentBlog.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="btn btn-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="btn btn-danger mr-2"
      @click="deleteBlog"
    >
      Delete
    </button>

    <button type="submit" class="btn btn-success"
      @click="updateBlog"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Blog...</p>
  </div>
  </div>
</template>

<script>
import BlogService from "../services/BlogService";

export default {
  name: "blog",
  data() {
    return {
      currentBlog: null,
      message: ''
    };
  },
  methods: {
    getBlog(id) {
      BlogService.get(id)
        .then(response => {
          this.currentBlog = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentBlog.id,
        title: this.currentBlog.title,
        description: this.currentBlog.description,
        published: status
      };

      BlogService.update(this.currentBlog.id, data)
        .then(response => {
          this.currentBlog.published = status;
          console.log(response.data);		  
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateBlog() {
      BlogService.update(this.currentBlog.id, this.currentBlog)
        .then(response => {
          console.log(response.data);
          this.message = 'The blog was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteBlog() {
      BlogService.delete(this.currentBlog.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "blogs" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getBlog(this.$route.params.id);
  }
};
</script>