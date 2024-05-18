using Asp.Versioning;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Net;
using System.Net;
using System.Net.Http;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Authorization;

[ApiVersion(1)]
[ApiVersion(2)]
[ApiVersion(3)]
[Authorize]
[ApiController]
[Route("v{version:apiVersion}/[controller]")]
public class TestController :ControllerBase
{

    [HttpGet]
    [ApiVersion("1.0")]
    [HttpGet()]
    [Obsolete("Ця версія застаріла. Використовуйте v2.0 або v3.0.")]
    public IActionResult GetV1()
    {
        var random = new Random();
        return Ok(random.Next());
    }

    [HttpGet]
    [ApiVersion("2.0")]
    [HttpGet()]
    public IActionResult GetV2()
    {
        return Ok("Hello, world!");
    }

    [HttpGet]
    [ApiVersion("3.0")]
    [HttpGet()]
    public IActionResult GetV3()
    {
        using (var workbook = new XLWorkbook())
        {
            var worksheet = workbook.Worksheets.Add("Data");

            worksheet.Cell(1, 1).Value = "Hello from v3.0!";
            worksheet.Cell(2, 1).Value = "This is an Excel file generated on the server.";

            using (var stream = new MemoryStream())
            {
                workbook.SaveAs(stream);
                var content = stream.ToArray();
                return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "example.xlsx");
            }
        }
        }
}
