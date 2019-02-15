import * as React from 'react';
import { Button, Glyph } from 'elemental';

import styles from './style.less';

interface IProps {  }
interface IState {
    src: string;
    currentIndex: number;
    position: number;
    translateValue: number;
}

const SOURCE_LIST = [
	'https://placeimg.com/640/480/arch/1',
	'https://placeimg.com/640/480/arch/2',
	'https://placeimg.com/640/480/arch/3',
	'https://placeimg.com/640/480/arch/4',
	'https://placeimg.com/640/480/arch/5',
	'https://placeimg.com/640/480/arch/6',
	'https://placeimg.com/640/480/arch/7',
];
const STEP = 140;
const showCount = 4;



class Gallery extends React.Component<IProps, IState> {

	constructor(props) {
		super(props);
		this.state = {
			src: SOURCE_LIST[0],
            currentIndex: 0,
            position: 1,
            translateValue: 0
		}
	}

	private preview(source, index) {
        this.setState(prevState => ({
            src: source,
            currentIndex: index,
            position: prevState.position - (prevState.currentIndex - index)
        }));
	}

    private previousSlide () {
        if(this.state.currentIndex === 0) {
            return this.setState({
                src: SOURCE_LIST[SOURCE_LIST.length - 1],
                currentIndex: SOURCE_LIST.length - 1,
                position: showCount,
                translateValue: -(SOURCE_LIST.length - showCount) * STEP
            });
        }

        if(this.state.position === 1) {
            return  this.setState(prevState => ({
                src: SOURCE_LIST[prevState.currentIndex - 1],
                currentIndex: prevState.currentIndex - 1,
                translateValue: prevState.translateValue + STEP
            }));
        }

        this.setState(prevState => ({
            src: SOURCE_LIST[prevState.currentIndex - 1],
            currentIndex: prevState.currentIndex - 1,
            position: prevState.position - 1
        }));
    }

    private nextSlide () {

        if(this.state.currentIndex === SOURCE_LIST.length - 1) {
            return this.setState({
                src: SOURCE_LIST[0],
                currentIndex: 0,
                position: 1,
                translateValue: 0
            });
        }

        if(this.state.currentIndex - (this.state.position - 1) + showCount < SOURCE_LIST.length) {
            return  this.setState(prevState => ({
                src: SOURCE_LIST[prevState.currentIndex + 1],
                currentIndex: prevState.currentIndex + 1,
                translateValue: prevState.translateValue - STEP
            }));
        }

        this.setState(prevState => ({
            src: SOURCE_LIST[prevState.currentIndex + 1],
            currentIndex: prevState.currentIndex + 1,
            position: prevState.position + 1
        }));
    }

	public render() {
		return (
			<div className={styles.wrapper}>
				<h1>Gallery App</h1>
				<div>
					<img
						width="640"
						height="480"
						src={this.state.src}
					/>
				</div>
				<div className={styles.navigation}>
					<div className={styles.left}>
						<Button  onClick={this.previousSlide.bind(this)}><Glyph icon="triangle-left" /></Button>
					</div>
					<div className={styles.reel}>
						<div style={{
                            transform: `translateX(${this.state.translateValue}px)`,
                            transition: 'transform ease-out 0.45s'
                        }} className={styles.reel_inner}>
							{SOURCE_LIST.map((source, key) => (
								<img key={key}
									src={source}
									width="120"
									height="90"
									className={this.state.currentIndex === key ? `${styles.preview} ${styles.active}` : styles.preview}
									 onClick={this.preview.bind(this, source, key)}
								/>
							))}
						</div>
					</div>
					<div className={styles.right}>
						<Button onClick={this.nextSlide.bind(this)}><Glyph icon="triangle-right" /></Button>
					</div>
				</div>
			</div>
		);
	}


}



export default Gallery;