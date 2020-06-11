import React  from 'react'
import { Link } from 'react-router-dom'


import Comments from '../comments/comments.component'


import PostItemHeaderButtons from '../post-item-header-buttons/post-item-header-buttons.component'
import AddComment from '../add-comment/add-comment.component'

import './post-item.style.scss'

const PostItem = ({ posts, currentUID }) =>{
	const { id, post, firstName, lastName, email, postImageUrl, currentUserAvatarUrl, comments, postUID } = posts
	return(
	<div className='post-item__container mb-2'>
		<div className='post__item'>
			<header className='post__item-header-user-info'>
				<figure className='post__item-header-user-image-container'>
					<img src={ currentUserAvatarUrl } className='post__item-header-user-image' alt='post header' />
				</figure>
				<h5 className='post__item-header-user-name-container'>
					<Link to='/'className='post__item-header-user-name'>{ `${firstName} ${lastName}` }</Link>
					<Link to='/'><em className='post__item-header-user-email'>{`@${email}`}</em> </Link>
				</h5>
				<PostItemHeaderButtons 
					post={ post }
					postItemId={ id }
					postUID={ postUID }
					currentUID={ currentUID }
					postImageUrl={ postImageUrl }
				/>

			</header>
			<div className='post__item-caption-container'>
				<p className='post__item-caption'>{ post }</p>
			</div>
			{ 
				postImageUrl ? 
					<figure className='post__item-image-container'>
						<img src={ postImageUrl } className='post__item-image' alt='Post'/>
					</figure>
				: null
			}			
			<Comments comments={comments} />
		 <AddComment postItemId={ id }/>
		</div>
	</div>
)
}
export default React.memo(PostItem)



		

// 		const PostItem = ({post, firstName, lastName, email, postImage, userImageUrl, ...otherProps}) =>{
// 	console.log('post-item component')
// 	return(
// 	<div className='post-item__container mb-2'>
// 		<div className='post__item'>
// 			<header className='post__item-header-user-info'>
// 				<figure className='post__item-header-user-image-container'>
// 					<img src={ userImageUrl } className='post__item-header-user-image' />
// 				</figure>
// 				<h5 className='post__item-header-user-name-container'>
// 					<Link to='/'className='post__item-header-user-name'> { `${firstName} ${lastName}` } </Link>
// 					<Link to='/'><em className='post__item-header-user-email'>{ `@${email}` }</em> </Link>
// 				</h5>
// 				<div className='post__item-header-button-container'>
// 					<span className='post__item-header-button'><i class="fas fa-ellipsis-h"></i></span>
// 				</div>
// 			</header>
// 			{ 
// 				postImage ?
// 					<figure className='post__item-image-container'>
// 						<img src={ postImage } className='post__item-image'/>
// 					</figure>
// 					: ''
// 			}
			
// 			<div className='post__item-content-container'>
// 				<div className='post__item-reaction-buttons-container'>
// 					 buttons to follow
// 				</div>
// 				<div className='post__item-caption-container'>
// 					<Link to='/'className='post__item-caption-user-name'>{ email }:</Link>
// 					<p className='post__item-caption'>{ post }</p>
// 				</div>
// 			</div>

// 		 <ul className='comments__lists-container'>
// 			<CommentItem/>
// 		 </ul>
// 		 <AddComment />
// 		</div>

// 	</div>
// )}

// export default React.memo(PostItem)


// 		