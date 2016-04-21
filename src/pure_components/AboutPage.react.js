import React, { Component } from 'react';
import { LoginForm } from './LoginForm.react';
import { Link } from 'react-router';
import toastr from 'toastr';


toastr.options = {
	"positionClass": "toast-top-center"
}


const salmon = '#F06373'
const blue = '#4A90E2'


export class AboutPage extends Component {
	constructor(props){
		super(props)
		this.state = { 
			githubIconFill: 'black'
		}
		this.glowIcon = setInterval( () =>  {
				this.setState({ githubIconFill: this.state.githubIconFill == 'black' ? blue : 'black' })
			}, 1500)
	}

	componentDidMount(){
		// this.glowIcon()
	}

	componentWillUnmount(){
		clearInterval(this.glowIcon)
	}

	render(){
		return(
			<div className="container" style={{ textAlign: 'center', position: 'relative' }}>

				{/* SVG GITHUB ICON LINK */}
				<a href="https://www.github.com/Neil-G/ThinkQuick" target="_blank">
					<svg width="25px" height="25px" viewBox="0 0 126 123" className='github-icon' style={{ position: 'fixed', top: '20px', left: '12px' }}>
					    <title>github10</title>
					    <desc>Created with Sketch.</desc>
					    <defs></defs>
					    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
					        <g id="Font-Awesome-Icon-Pack" transform="translate(-3111.000000, -913.000000)" fill={this.state.githubIconFill} style={{ transition: '1s all' }} >
					            <g id="github10" transform="translate(3110.843750, 913.500000)">
					                <path d="M117.178,31.122 C111.583,21.535 103.993,13.945 94.407,8.35 C84.819,2.755 74.352,-0.042 62.999,-0.042 C51.647,-0.042 41.177,2.756 31.591,8.35 C22.004,13.945 14.414,21.535 8.819,31.122 C3.224,40.709 0.427,51.178 0.427,62.529 C0.427,76.163 4.405,88.424 12.363,99.314 C20.32,110.204 30.599,117.74 43.2,121.922 C44.667,122.194 45.753,122.003 46.459,121.353 C47.165,120.701 47.518,119.886 47.518,118.909 C47.518,118.746 47.504,117.28 47.477,114.51 C47.449,111.739 47.436,109.322 47.436,107.26 L45.562,107.584 C44.367,107.803 42.86,107.896 41.04,107.869 C39.221,107.844 37.333,107.653 35.378,107.299 C33.422,106.947 31.603,106.133 29.919,104.857 C28.236,103.58 27.041,101.909 26.335,99.846 L25.52,97.971 C24.977,96.723 24.122,95.337 22.954,93.817 C21.786,92.296 20.605,91.264 19.41,90.721 L18.84,90.314 C18.46,90.042 18.107,89.715 17.781,89.335 C17.455,88.955 17.211,88.575 17.048,88.194 C16.885,87.814 17.02,87.501 17.455,87.256 C17.89,87.011 18.677,86.891 19.818,86.891 L21.447,87.135 C22.533,87.352 23.877,88.003 25.48,89.09 C27.082,90.176 28.399,91.588 29.431,93.325 C30.681,95.553 32.187,97.25 33.953,98.418 C35.718,99.586 37.497,100.169 39.289,100.169 C41.081,100.169 42.629,100.033 43.933,99.762 C45.236,99.491 46.458,99.083 47.599,98.54 C48.088,94.9 49.419,92.103 51.591,90.148 C48.495,89.822 45.712,89.332 43.24,88.681 C40.769,88.029 38.216,86.97 35.582,85.502 C32.947,84.036 30.761,82.216 29.023,80.044 C27.285,77.871 25.859,75.019 24.746,71.489 C23.633,67.958 23.076,63.885 23.076,59.268 C23.076,52.695 25.222,47.101 29.513,42.484 C27.503,37.542 27.693,32.002 30.083,25.864 C31.658,25.375 33.994,25.742 37.09,26.964 C40.186,28.186 42.453,29.233 43.893,30.101 C45.333,30.969 46.487,31.704 47.356,32.301 C52.408,30.889 57.622,30.183 62.999,30.183 C68.376,30.183 73.591,30.889 78.644,32.301 L81.74,30.346 C83.857,29.042 86.357,27.847 89.234,26.761 C92.113,25.675 94.314,25.376 95.835,25.865 C98.279,32.003 98.496,37.543 96.486,42.485 C100.777,47.102 102.923,52.697 102.923,59.269 C102.923,63.886 102.365,67.972 101.253,71.53 C100.139,75.089 98.701,77.939 96.936,80.085 C95.17,82.231 92.97,84.037 90.336,85.503 C87.701,86.97 85.148,88.029 82.677,88.681 C80.205,89.333 77.422,89.823 74.326,90.149 C77.15,92.593 78.562,96.449 78.562,101.718 L78.562,118.907 C78.562,119.884 78.902,120.699 79.581,121.35 C80.26,122.001 81.332,122.192 82.799,121.92 C95.401,117.738 105.68,110.202 113.637,99.311 C121.594,88.422 125.573,76.161 125.573,62.526 C125.57,51.177 122.771,40.709 117.178,31.122 L117.178,31.122 Z" id="Shape"></path>
					            </g>
					        </g>
					    </g>
					</svg>
				</a>

				{/* PLAY BUTTON */}
				<Link to="play"><button className='play-button' style={{ margin: '20px auto 20px' }}> I know how to play already! </button> </Link>
				{/* INSTRUCTIONS */}
				<p className='instruction-box' style={{ background: '#ECEFF1' }}> 5 Problems </p> 
				<p className='instruction-box' style={{ background: '#CFD8DC' }}> 3 numbers each  </p> 
				<p className='instruction-box' style={{ background: '#B0BEC5' }}> Addition + or Multiplication x </p> 
				<p className='instruction-box' style={{ background: '#90A4AE', color: 'rgba(255,255,255,0.87)' }}> Answer any first </p> 
				<p className='instruction-box' style={{ background: '#78909C', color: 'rgba(255,255,255,0.87)' }}> And get sent to the Winner's Column </p> 
				<p className='instruction-box' style={{ background: '#607D8B', color: 'rgba(255,255,255,0.87)' }}> Solved problems regnerate endlessly </p> 
				<p className='instruction-box' style={{ background: '#546E7A', color: 'rgba(255,255,255,0.87)' }}> Easy Sign Up and Sign In </p>
				<p className='instruction-box' style={{ background: '#455A64', color: 'rgba(255,255,255,0.87)' }}> Enter any Username and Password </p> 
				<p className='instruction-box' style={{ background: '#37474F', color: 'rgba(255,255,255,0.87)' }}> And the rest is taker care of </p> 
				<p className='instruction-box' style={{ background: '#263238', color: 'rgba(255,255,255,0.87)' }}> Oh and this is REAL-TIME! It's a free for all vs. anyone else on the page! </p> 
				{/* PLAY BUTTON */}
				<Link to="play"><button className='play-button' style={{ margin: '10px auto 50px' }}> Got it? Ok, now go Play! </button> </Link>
				<p style={{ color: 'tomato' }} > FYI: Click on ThinkQuick! in the top left corner of the game screen to see these instructions again </p>
			</div>
		);
	}
}