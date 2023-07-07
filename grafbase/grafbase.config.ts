import { g, auth, config } from '@grafbase/sdk'

const User = g.model('User',{
    name:g.string().length({min:2 ,max:20}),
    email:g.string().unique(),
    avatatURL:g.url(),
    description:g.string().optional(),
    githubURL:g.url().optional(),
    linkedinURL:g.url().optional(),
    projects:g.relation(()=>Project).list().optional(),
})

const Project = g.model('Project',{

  title:g.string().length({min:3}),
  description:g.string().optional(),
  image:g.url(),
  liveSiteURL:g.url(),
  githubURL:g.url().optional(),
  categoty:g.string().search(),
  createdBy:g.relation(() => User),


})
export default config({
  schema: g
  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [authProvider],
  //   rules: (rules) => {
  //     rules.private()
  //   }
  // }
})
