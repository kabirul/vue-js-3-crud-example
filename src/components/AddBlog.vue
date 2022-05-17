<template>
 <div class="col-md-6 offset-md-3">
 <Form @submit="handleLogin">	
   <h3>Add Blog</h3>
    <div v-if="!submitted">		 
      <div class="form-group">
        <label for="title">Title</label>
        <Field type="text" class="form-control" id="title" :rules="title"  name="title" />         
		<ErrorMessage name="title" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <Field class="form-control" id="description" :rules="description" name="description"/>   
		<ErrorMessage name="description" class="error-feedback" />
      </div>
       <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Submit</span>
          </button>
        </div> 		   
        </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newBlog">Add</button>
    </div>
  </Form>   
  </div>
</template>

<script>
import BlogService from "../services/BlogService";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "add-blog",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {        		
	return {  
		title: yup.string().required("Title is required!"),
		description: yup.string().required("Description is required!"),   
		submitted: false,
		loading: false, 		
    };	
	
  },
  methods: {  
     handleLogin(blog) {  	
     this.loading = true;		   
      BlogService.create(blog)
        .then(response => {     
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newBlog() {
       this.submitted = false;
       this.loading = false;
    }
  }
};
</script>

<style scoped>
.error-feedback {
  color: red;
}
</style>