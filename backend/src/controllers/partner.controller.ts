import {Controller, Get, Post, Put, Delete} from "@overnightjs/core";
import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";



@Controller("api/partner")
export class PartnerController {

  partnerClient: PrismaClient = new PrismaClient();

  @Get()
  private async getAll(req: Request, res: Response) {
    await this.partnerClient.partner.findMany()
      .then(resp => {
        return res.status(200).json(resp);
      })
      .catch(e => {
        return res.status(404).json({
          msg: `Error getting all partner \n ${e}`
        });
      });
  }

  @Get(":id")
  private async getPartnerById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await this.partnerClient.partner.findUnique({
      where: {id: id}
    }).then(resp => {
        return res.status(200).json(resp);
    }).catch(e => {
      return res.status(404).json({
        msg: `Error getting partner by id ${id} \n ${e}`
      });
    });
  }

  @Post()
  private async createPartner(req: Request, res: Response) {
    const {name, timeWork, url, about} = req.body;
    await this.partnerClient.partner.create({
      data: {
        name: name,
        timeWork: timeWork,
        url: url,
        about: about
      }
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(404).json({
        msg: `Error creating user \n ${e}`
      });
    });
  }

  @Put(":id")
  private async editPartnerById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const {name, timeWork, url, about} = req.body;

    if (name !== undefined) {
      await this.partnerClient.partner.update({
        where: {id: id},
        data: {
          name: name
        }
      }).catch(e => {
        return res.status(404).json({
          msg: `Error edit %name% field by id ${id} \n ${e}`
        })
      });
    }
    if (timeWork !== undefined) {
      await this.partnerClient.partner.update({
        where: {id: id},
        data: {
          timeWork: timeWork
        }
      }).catch(e => {
        return res.status(404).json({
          msg: `Error edit %timeWork% field by id ${id} \n ${e}`
        })
      });
    }
    if (url !== undefined) {
      await this.partnerClient.partner.update({
        where: {id: id},
        data: {
          url: url
        }
      }).catch(e => {
        return res.status(404).json({
          msg: `Error edit %url% field by id ${id} \n ${e}`
        })
      });
    }
    if (about !== undefined) {
      await this.partnerClient.partner.update({
        where: {id: id},
        data: {
          about: about
        }
      }).catch(e => {
        return res.status(404).json({
          msg: `Error edit %about% field by id ${id} \n ${e}`
        })
      });
    }

    await this.partnerClient.partner.findUnique({
      where: {id: id}
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(404).json({
        msg: `Unexpected error in edit partner method \n ${e}`
      });
    });
  }

  @Delete(":id")
  private async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    await this.partnerClient.partner.delete({
      where: {id: id}
    }).then(resp => {
      return res.status(200).json(resp);
    }).catch(e => {
      return res.status(404).json({
        msg: `Error deleting partner by id ${id} \n ${e}`
      })
    })
  }
}