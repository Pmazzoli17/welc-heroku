$(document).ready(function() {
  /* global moment */
  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  var postInputSelect = $("#input");

  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  $(document).on("click", "button.email", handlePostEmail);
  postInputSelect.on("change", handleInputChange);
  var posts;

  // This function grabs posts from the database and updates the view
  function getPosts(input) {
    var inputString = input || "";
    if (inputString) {
      inputString = "/input/" + inputString;
    }
    $.get("/api/posts" + inputString, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
    .done(function() {
      getPosts(postInputSelect.val());
    });
  }

  // Getting the initial list of posts
  getPosts();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostPanel = $("<div class = 'panel panel-default'>");
    var newPostPanelHeading = $("<div class ='panel-heading'>");
    var deleteBtn = $("<button>");
    deleteBtn.text("Delete Me");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("Edit Profile");
    editBtn.addClass("edit btn btn-default");

    var emailBtn = $("<button>");
    emailBtn.text("Click to Contact");
    // emailBtn.addClass("email btn btn-default");
    emailBtn.addClass("email btn btn pull-right");

    var newPostname = $("<h2 class 'postInfo'>");
        var newPostCity = $("<span class = 'userData city postInfo'>");
    var newPostState = $("<span class = 'userData state postInfo'>");
    var newPostDate = $("<h4 class = 'postInfo'>");
    var newPostInput = $("<h5 class = 'postInfo'>");
    newPostInput.text(post.input);
    newPostInput.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });
    var newPostPanelBody = $("<div>");
    //newPostPanelBody.addClass("panel-body");

    // var newPostBody = $("<p>");


    newPostname.text(post.name + " ");

    // newPostBody.text(post.body);
    newPostCity.text(post.city);
    newPostState.text(post.state);

    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY");
    newPostDate.text("Profile Creation Date: " +   formattedDate);
    
    newPostname.append(newPostDate);
    newPostPanelHeading.append(deleteBtn);

    newPostPanelHeading.append(editBtn);
    newPostPanelHeading.append(emailBtn);

    newPostPanelHeading.append(newPostname);
    newPostPanelHeading.append(newPostCity);
    newPostPanelHeading.append(newPostState);
    newPostPanelHeading.append(newPostInput);



    newPostPanel.append(newPostPanelHeading);
    newPostPanel.append(newPostPanelBody);
    newPostPanel.data("post", post);
    return newPostPanel;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");

    window.location.href = "/mainPage?post_id=" + currentPost.id;
  }

  // This function figures out which user we want to Email and takes them to their email, 
  // with that users info already filled out.
  function handlePostEmail() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "mailto:" + currentPost.email;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    blogContainer.empty();
    // var messageh2 = $("<h2>");
    // messageh2.css({ "text-align": "center", "margin-top": "50px" });
    // messageh2.html("No posts yet for this category, navigate <a href='/mainPage'>here</a> in order to create a new post.");
    // blogContainer.append(messageh2);
  }

  // This function handles reloading new posts when the category changes
  function handleInputChange() {
    var newPostInput = $(this).val();
    getPosts(newPostInput);
  }

});