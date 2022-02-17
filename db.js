import { PrismaClient } from '@prisma/client'


  // allow global `var` declarations
  // eslint-disable-next-line no-var
export const prisma = new PrismaClient({
    log:["query"],
})

//   if (prisma == null)
//   {
//       prisma = new PrismaClient({
//           log:["query"],
//       })
//   }

