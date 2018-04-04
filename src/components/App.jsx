import React, { Component } from 'react';
import Header from './header.jsx';
import SubmissionForm from './submission-form.jsx';
import PhotoGallery from './photoGallery.jsx';
import Footer from './footer.jsx';


class App extends Component{
  constructor(props) {
    super(props)
    this.state = {};
    this.deletePost = this.deletePost.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.commentPost = this.commentPost.bind(this);
}

  componentDidMount() {
    console.log(`componentDidMount fired!!! `);
    fetch('/test', {credentials: "same-origin"})
    .then(response => response.json())
    .then(myJson => {
      console.log('myJson', myJson);
      this.setState(myJson);
    })
    .catch(err => console.log(err));

  }

	commentPost(content, postid, createdby) {
		fetch('/comment', {
			method: 'POST',
			headers: {
				credentials: "same-origin",
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				content,
				postid,
				createdby
			})
		})
		.then((res) => {
			this.setState({gallery: this.state.gallery.map(post => {
				if(post.id === postid) {
					if(post.comments) post.comments.push({createdby, content});
					else {
						const commentArr = [];
						commentArr.push({createdby, content});
						post.comments = commentArr;
					}
					return post;
				}
				return post;
			})
		})
	})
}

  voteUp(username, postby) {
  fetch('/voteup', {
    method: 'POST',
    headers: {
      credentials: 'same-origin',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      postby: postby,
    })
  })
  .then(res => {
    let gallery = this.state.gallery;
    for (let i = 0; i < gallery.length; i++) {
      if (gallery[i].postby === postby) {
          gallery[i].votes = gallery[i].votes + 1;
      }
    }
    this.setState({gallery: gallery});
  })
};


	deletePost(id, username) {
		fetch('/delete', {
			method: 'POST',
			headers: {
				credentials: "same-origin",
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: id, username: username })
		}).then(result => {
            let gallery = this.state.gallery;
            let outGallery = [];
            for (let i = 0; i < gallery.length; i++) {
                if (gallery[i].postby !== username) {
                    outGallery.push(gallery[i]);
                }
            }
            this.setState({gallery: outGallery});
		}).catch(err => {
			console.log('ERROR!', err);
		});
    }
    

    render(){

      let showSubmit = [];
      if(this.state.submissioncount > 0 ) {
        showSubmit.push(<SubmissionForm username={this.state.username} />);
      } else {
        showSubmit.push(<div></div>);
      }
        
        return (
            <div>
                <Header id='header' username={this.state.username}  avatar={this.state.avatar} />
                { showSubmit }
                <PhotoGallery gallery={this.state.gallery} usernameLoggedIn={this.state.username} commentPost={this.commentPost} voteUp={this.voteUp} deletePost={this.deletePost}/>
                <Footer />
            </div>
        );
    }

}

export default App;

