using AttendanceApi.Data;
using AttendanceApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AttendanceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly AttendanceContext _context;

        public ReportsController(AttendanceContext context)
        {
            _context = context;
        }

        // GET: api/reports/attendance
        [HttpGet("attendance")]
        public async Task<ActionResult<object>> GetAttendanceReport()
        {
            var report = await _context.Attendances
                .Include(a => a.Session)
                .ThenInclude(s => s.Course)
                .Include(a => a.Student)
                .GroupBy(a => new { a.Session.CourseId, CourseName = a.Session.Course.Name, a.StudentId, StudentName = a.Student.Name })
                .Select(g => new
                {
                    CourseId = g.Key.CourseId,
                    CourseName = g.Key.CourseName,
                    StudentId = g.Key.StudentId,
                    StudentName = g.Key.StudentName,
                    TotalSessions = g.Count(),
                    PresentCount = g.Count(a => a.Status == AttendanceStatus.Present),
                    AbsentCount = g.Count(a => a.Status == AttendanceStatus.Absent),
                    LateCount = g.Count(a => a.Status == AttendanceStatus.Late),
                    AttendancePercentage = (double)g.Count(a => a.Status == AttendanceStatus.Present) / g.Count() * 100
                })
                .ToListAsync();

            return report;
        }
    }
}