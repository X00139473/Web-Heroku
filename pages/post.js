import {withRouter} from 'next/router'



const Content = withRouter((props) => (
  <div>
    <h1>{props.router.query.title}</h1>
    <p>hey</p>
  </div>
))

const Page = (props) => (
    <div>
         <Content />
    </div>
      
    
)

export default Page