const App = ({courses}) => {
  return (
    <div>
      {courses.map(function(course) {
        return (
        <div key={course.id}>
          <Header course={course.name} />
          <Content  parts={course.parts}/>
          <Total  total={course.parts.reduce(function(sum, part){
            return sum + part.exercises
          }, 0)}/>
        </div>
        )
      })}
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content = ({parts}) => {
  return (
    <div>
    {/* //   <Part name={props.parts[0].name} number={props.parts[0].exercises}/>
    //   <Part name={props.parts[1].name} number={props.parts[1].exercises}/>
    //   <Part name={props.parts[2].name} number={props.parts[2].exercises}/> */}
      {parts.map(part => 
      <Part key={part.id} name={part.name} number={part.exercises}/>
      )}
    </div>
  )
}
const Part = (props) => {
  return(
    <p>
    {props.name} {props.number}
  </p>
  )
}
const Total = (props) => {
  return (
    <div>
      <b>Number of exercises {props.total}</b>
    </div>
  )
}

export default App