import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  blogPosts = [
    { title: 'The Art of Handcrafted Woodwork', snippet: 'Discover the beauty of handcrafted furniture...', content: 'Full blog content here...' },
    { title: 'Choosing the Best Wood for Your Project', snippet: 'Hardwood vs Softwood...', content: 'Full blog content here...' },
    { title: 'Sustainable Woodworking Practices', snippet: 'How to source eco-friendly wood...', content: 'Full blog content here...' }
  ];

  selectedPost: any = null;

  selectPost(post: any) {
    this.selectedPost = post;
  }

  closePost() {
    this.selectedPost = null;
  }
}