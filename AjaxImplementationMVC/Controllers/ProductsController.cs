using Microsoft.AspNetCore.Mvc;

namespace AjaxImplementationMVC.Controllers
{
    public class ProductsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
