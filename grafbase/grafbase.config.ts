import { g, auth, config } from '@grafbase/sdk'

const User = g.model('User',{
    name:g.string().length({min:2 ,max:20}),
    email:g.string().unique(),
    avatarUrl:g.url(),
    description:g.string().optional(),
    githubUrl:g.url().optional(),
    linkedinUrl:g.url().optional(),
    projects:g.relation(()=>Project).list().optional(),
})

const Project = g.model('Project',{

  title:g.string().length({min:3}),
  description:g.string().optional(),
  image:g.url(),
  liveSiteUrl:g.url(),
  githubUrl:g.url().optional(),
  category:g.string().search(),
  createdBy:g.relation(() => User),


})


const jwt = auth.JWT({
  issuer: 'grafbase',
  secret:  g.env('NEXTAUTH_SECRET')
})


export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private()
  },
})
