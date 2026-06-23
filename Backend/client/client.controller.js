import prisma from '../lib/prisma.js'

const generateSlug = title =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export const createData = async (req, res) => {
  const { title, description ,image} = req.body
//   console.log(title , generateSlug(title) ,description);
console.log(req.bodyy);

  

  if (!title) return res.status(400).json({ message: 'title is requred' })

  try {
    const data = await prisma.cLIENT.create({
      data: {
        title,
        slug: generateSlug(title),
        image: image,
        description
      }
    })

    res.status(201).json({ message: 'Create successfully.', data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getClint = async (req, res) => {
  const slug = req.params.slug

  const client = await prisma.cLIENT.findUnique({
    where: { slug }
  })
  res.send({ client })
}

