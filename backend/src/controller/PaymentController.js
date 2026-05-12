import { createPaymentService, getPaymentsByInvoice, listPaymentsService } from "../services/paymentService.js";
export async function createPayment(req, res, next) {
  try {
    const payment = await createPaymentService(
      req.user._id,
      req.params.id,
      req.body
    );
    res.status(201).json({
      status: "success",
      data: payment,
    });
  } catch (err) {
    next(err);
  }
}
export async function getPayments(req, res, next) {
  try {
    const payments = await listPaymentsService(
      req.user._id,
      req.params.id
    );

    res.status(200).json({
      status: "success",
      results: payments.length,
      data: payments,
    });
  } catch (err) {
    next(err);
  }
}
export async function getPagPayment(req,res,next){
  try{
    const page=req.query.page;
    const limit=req.query.limit
    const invoiceId=req.params.invoiceId
    const payments=await getPaymentsByInvoice(invoiceId, req.user._id, page, limit)
    res.status(200).json({
      status:"success",
      data:payments
    })
  }catch(err){
    next(err);
  }
}

