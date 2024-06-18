using AjaxImplementationMVC.Data;
using AjaxImplementationMVC.Models;
using Microsoft.AspNetCore.Mvc;

namespace AjaxImplementationMVC.Controllers
{
    public class ProductsController : Controller
    {
        private readonly ApplicationDbContext db;
        public ProductsController(ApplicationDbContext db)
        {
            this.db = db;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult AddProduct(Product p)
        {  
            //db.products.Add(p);
            //db.SaveChanges();
            //return new JsonResult("");
            if (ModelState.IsValid)
            {
                db.products.Add(p);
                db.SaveChanges();
                return Json(new { success = true });
            }
            return Json(new { success = false, errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage) });

        }


        public IActionResult ShowProducts()
        {    var data=db.products.ToList();
           
            return new JsonResult(data);

        }
    }
}
