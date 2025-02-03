const courses: any[] = []
export const getCourses = async () => {
  if (courses.length) return courses
  const items: any[] = await fetch('https://practica9-32729-default-rtdb.europe-west1.firebasedatabase.app/').then(res => res.json())
  courses.push(...items)
  return courses
}