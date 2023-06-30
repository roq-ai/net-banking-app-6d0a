import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { bankValidationSchema } from 'validationSchema/banks';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getBanks();
    case 'POST':
      return createBank();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBanks() {
    const data = await prisma.bank
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'bank'));
    return res.status(200).json(data);
  }

  async function createBank() {
    await bankValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.bill?.length > 0) {
      const create_bill = body.bill;
      body.bill = {
        create: create_bill,
      };
    } else {
      delete body.bill;
    }
    if (body?.transaction?.length > 0) {
      const create_transaction = body.transaction;
      body.transaction = {
        create: create_transaction,
      };
    } else {
      delete body.transaction;
    }
    const data = await prisma.bank.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
