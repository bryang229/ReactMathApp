import React from 'react';
import './App.css';
import GithubLogo from "/Users/bryangaray/Documents/GitHub/ReactMathApp/src/media/github logo.png";
import LinkedInLogo from "/Users/bryangaray/Documents/GitHub/ReactMathApp/src/media/linkedIn logo.png";

//interfaces:
interface LinkedInProps {
    hasLinkedIn: boolean,
    linkedInLink: string
}

interface GithubProps {
    hasGithub: boolean,
    githubLink: string
}

interface DisplayProps {
    name: string,
    hasLinkedIn: boolean,
    hasGithub: boolean,
    linkedInLink: string,
    githubLink: string
}

//class to show the ROOR team however they did not work in developing the TS version
class DevInfo {
    name: string;
    hasLinkedIn: boolean;
    hasGithub: boolean;
    linkedInLink: string;
    githubLink: string;

    constructor(name: string, hasLinkedIn: boolean, hasGithub: boolean, linkedInLink: string, githubLink: string) {
        this.name = name;
        this.hasLinkedIn = hasLinkedIn;
        this.hasGithub = hasGithub;
        this.linkedInLink = linkedInLink;
        this.githubLink = githubLink;
    }
}

//it looks nice
const GithubPreview = ({hasGithub, githubLink}: GithubProps) => {
    if (hasGithub) {
        return (
            <>
                <a href={githubLink}><img className="github" src={GithubLogo} alt="Github"/></a>
            </>
        )
    } else {
        return <></>;
    }
}
//at least i think so
const LinkedInPreview = ({hasLinkedIn, linkedInLink}: LinkedInProps) => {
    if (hasLinkedIn) {
        return (
            <>
                <a href={linkedInLink}><img className="linkedin" src={LinkedInLogo} alt="linkedIn"/></a>
            </>
        )
    } else {
        return <></>;
    }
}

const DisplayInfo = ({name, hasLinkedIn, hasGithub, linkedInLink, githubLink}: DisplayProps) => {
    return (
        <>
            <h3>{name}</h3>
            <div className="links">
                <LinkedInPreview hasLinkedIn={(hasLinkedIn)} linkedInLink={linkedInLink}/>
                <GithubPreview hasGithub={hasGithub} githubLink={githubLink}/>
            </div>
        </>
    );
}


let bryan = new DevInfo("Bryan", true, true, "https://linkedin.com/in/bryang229", "https://github.com/bryang229");
let isaiah = new DevInfo("Isaiah", false, true, "", "https://github.com/IsaiahMar")
let david = new DevInfo("David", false, true, "", "https://github.com/David800888")
let josiah = new DevInfo("Josiah", false, false, "", "");


const decodeOperand = (operand: number): string => {
    // 1:+ 2:- 3:*
    //important for generating random questions
    if (operand === 1)
        return "+";
    else if (operand === 2)
        return "-";
    else if (operand === 3)
        return "*";
    return "Operand Error? ";
}

const decodeMode = (mode: number): string => {
    switch (mode) {
        case 0:
            return "Chosen: Easy mode";
        case 1:
            return "Chosen: Medium mode";
        case 2:
            return "Chosen: Hard Mode";
        default:
            return "Error??";
    }
}

const getSum = (a: number, b: number, operand: number): number => {
    //the important thing about the getSum function is keeping the a - b relationships, this allows
    //for combining steps such as a - (b*c) +/-/* d => getSum(getSum(a,getSum(b,c,3),2),d,(1/2/3))
    //           the above function rewritten as it's output->  a (2=='-') (b (3=='*') c) +/-/* d
    if (operand === 1)
        return a + b;
    else if (operand === 2)
        return a - b;
    else if (operand === 3)
        return a * b;
    return -1;

}

interface WebAppInter {
    answer: number,
    mode: number,
    score: number,
    userInput: number,
    eq: string,
    feedback: string
}


class WebApp extends React.Component<any, WebAppInter> {
    constructor(props: any) {
        super(props);
        this.state = {
            answer: 0,
            mode: 4,
            eq: "",
            score: 0,
            userInput: 0,
            feedback: ""
        };
    }

    easyMode = () => {
        let a = Math.floor(Math.random() * 50) - 25;
        let b = Math.floor(Math.random() * 50) - 25;
        let operand = Math.floor(Math.random() * 3) + 1;
        console.log(`${a} ${b} ${operand}`);
        this.setState({
            answer: getSum(a, b, operand),
            eq: `${a} ${decodeOperand(operand)} ${b}`
        });
    }

    //note i write in terms of +/* however keep in mind it could be +/-/* so order of operations is important
    mediumMode = () => {
        let a = Math.floor(Math.random() * 50) - 24;
        let b = Math.floor(Math.random() * 50) - 24;
        let c = Math.floor(Math.random() * 50) - 24;
        let sumA = 0;
        let sumB = 0;

        //KEY: 1:+ 2:- 3:*
        let operand = Math.floor(Math.random() * 3) + 1;
        let operand2 = Math.floor(Math.random() * 3) + 1;
        console.log(`${a} ${b} ${c} ${operand} ${operand2}`)

        if (operand2 === 3) {
            //in case of a (+/-) b * c we do sumA = (b*c) and sumB = a (+/-) sumA == a (+/-) (b*c)
            sumA = getSum(b, c, operand2);
            sumB = getSum(a, sumA, operand);
        } else {
            sumA = getSum(a, b, operand);
            sumB = getSum(sumA, c, operand2);
        }
        this.setState({
            answer: sumB,
            eq: `${a} ${decodeOperand(operand)} ${b} ${decodeOperand(operand2)} ${c}`
        });
    }

    hardMode = () => {
        let a = Math.floor(Math.random() * 50) - 24;
        let b = Math.floor(Math.random() * 50) - 24;
        let c = Math.floor(Math.random() * 50) - 24;
        let d = Math.floor(Math.random() * 50) - 24;
        let sumA = 0;
        let sumB = 0;
        let sumC = 0;
        //KEY: 1:+ 2:- 3:*
        let operand = Math.floor(Math.random() * 3) + 1;
        let operand2 = Math.floor(Math.random() * 3) + 1;
        let operand3 = Math.floor(Math.random() * 3) + 1;
        console.log(`${a} ${b} ${c} ${d} ${operand} ${operand2} ${operand3}`)

        //this checks for * to make sure pemdas works 3 = *, 2 = +/-
        //defaults: 3 3 3, 3 2 2, 3 3 2 , 2 2 2
        // 2 3 3, 2 3 2, 2 2 3
        if (operand2 === 3 || operand3 === 3) {
            if (operand2 === 3 && operand3 === 3) {
                //a (+/*) b * c * d => (b*c*d) +/* a
                sumA = getSum(b, c, operand2);
                sumB = getSum(sumA, d, operand3);
                sumC = getSum(a, sumB, operand);
            } else if (operand2 === 3 && operand3 !== 3) {
                // a +/* b * c +/- d => (b*c) +/* a or a - (b*c)
                sumA = getSum(b, c, operand2);
                sumB = getSum(a, sumA, operand);
                sumC = getSum(sumB, d, operand3)
            } else if (operand3 === 3) {
                //a +/* b +/- c * d
                sumA = getSum(c, d, operand3);
                sumB = getSum(a, b, operand);
                sumC = getSum(sumB, sumA, operand2);
            }
        } else {
            sumA = getSum(a, b, operand);
            sumB = getSum(sumA, c, operand2);
            sumC = getSum(sumB, d, operand3);
        }
        this.setState({
            answer: sumC,
            eq: `${a} ${decodeOperand(operand)} ${b} ${decodeOperand(operand2)} ${c} ${decodeOperand(operand3)} ${d}`
        })
    }

     checkAnswer = (userInput: number) =>{
        if(this.state.answer === userInput) {
            this.setState({
                score: ((this.state.mode+1) + this.state.score),
            })
            console.log("->" + this.state.score);
            switch (this.state.mode) {
                case 0:
                    this.easyMode();
                    break;
                case 1:
                    this.mediumMode();
                    break;
                case 2:
                    this.hardMode();
                    break;
                default:
                    break;
            }}
        else{
                this.setState({
                    feedback: `Try Again!`
                })
        }
         this.setState({
             feedback: ` your score is ${this.state.score}!`
         })
    }

    NavBar = () => {
        return (
            <nav>
                <div onClick={(event: React.MouseEvent<HTMLElement>) => {
                    this.clicked(0)
                }}>Easy
                </div>
                <div onClick={(event: React.MouseEvent<HTMLElement>) => {
                    this.clicked(1)
                }}>Medium
                </div>
                <div onClick={(event: React.MouseEvent<HTMLElement>) => {
                    this.clicked(2)
                }}>Hard
                </div>
            </nav>
        )
    }

    Footer = () => {
        return (
            <footer>
                <h3>ЯO|OR</h3>
                <div id="about">
                    <DisplayInfo name={bryan.name} hasGithub={bryan.hasGithub} hasLinkedIn={bryan.hasLinkedIn}
                                 linkedInLink={bryan.linkedInLink} githubLink={bryan.githubLink}/>
                    <DisplayInfo name={isaiah.name} hasGithub={isaiah.hasGithub} hasLinkedIn={isaiah.hasLinkedIn}
                                 linkedInLink={isaiah.linkedInLink} githubLink={isaiah.githubLink}/>
                    <DisplayInfo name={david.name} hasGithub={david.hasGithub} hasLinkedIn={david.hasLinkedIn}
                                 linkedInLink={david.linkedInLink} githubLink={david.githubLink}/>
                    <DisplayInfo name={josiah.name} hasGithub={josiah.hasGithub} hasLinkedIn={josiah.hasLinkedIn}
                                 linkedInLink={josiah.linkedInLink} githubLink={josiah.githubLink}/>
                </div>
            </footer>
        );
    }

    HomePage = () => {
        return (
            <div>
                <h1>Choose your difficulty</h1>
                <br/>
                <div className="App">
                    <this.NavBar/>
                </div>
                <this.Footer/>
            </div>
        );
    }

    handleChange = (e: any) =>{
        this.setState({
            userInput: parseInt(e.target.value)
        })
    }

    QuestionForm = () => {
        return (
            <div>
                <h1>{decodeMode(this.state.mode)}</h1>
                <form id={"qForm"} onSubmit={(e:any)=>{
                    e.preventDefault();
                    this.checkAnswer(this.state.userInput)
                    console.log(`${this.state.userInput} ${this.state.answer}`)
                }}>
                    <h1>{this.state.eq}?</h1>
                    <label>
                        Enter Answer Here:
                        <input type={"text"} onChange={this.handleChange} id={"answer"} />
                        <input type={"button"} value={"Submit"} onClick={(event: React.MouseEvent<HTMLElement>) => {
                            this.checkAnswer(this.state.userInput)
                            console.log(`${this.state.userInput} ${this.state.answer}`)
                        }}/>
                    </label>
                    <h2>{this.state.feedback}
                    </h2>
                </form>
                <div id={"returnParent"}>
                    <div id={"return"} onClick={(event: React.MouseEvent<HTMLElement>) => {
                        this.clicked(4)
                    }}>
                        Go back
                    </div>
                </div>
                <this.Footer/>
            </div>
        );
    }

    clicked(mode: number) {
        switch (mode) {
            case 0:
                this.easyMode();
                break;
            case 1:
                this.mediumMode();
                break;
            case 2:
                this.hardMode();
                break;
            default:
                break;
        }
        this.setState({
            mode: this.state.mode === 4 ? mode : 4
        })
    }

    render() {
        if (this.state.mode === 4) {
            return (
                <div>
                    <this.HomePage/>
                </div>
            );
        }
        return (
            <div>
                <this.QuestionForm/>
            </div>
        );
    }
}

function App() {
    return (
        <WebApp/>
    );
}

export default App;
