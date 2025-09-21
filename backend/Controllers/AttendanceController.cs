using AttendanceApi.Data;
using AttendanceApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AttendanceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly AttendanceContext _context;

        public AttendanceController(AttendanceContext context)
        {
            _context = context;
        }

        // GET: api/attendance?courseId=1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Attendance>>> GetAttendance([FromQuery] int? courseId, [FromQuery] int? studentId)
        {
            IQueryable<Attendance> query = _context.Attendances
                .Include(a => a.Session)
                .Include(a => a.Student);

            if (courseId.HasValue)
            {
                query = query.Where(a => a.Session.CourseId == courseId.Value);
            }

            if (studentId.HasValue)
            {
                query = query.Where(a => a.StudentId == studentId.Value);
            }

            return await query.ToListAsync();
        }

        // POST: api/attendance
        [HttpPost]
        public async Task<ActionResult<Attendance>> PostAttendance(Attendance attendance)
        {
            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAttendance", new { id = attendance.Id }, attendance);
        }

        // PUT: api/attendance/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAttendance(int id, Attendance attendance)
        {
            if (id != attendance.Id)
            {
                return BadRequest();
            }

            _context.Entry(attendance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttendanceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool AttendanceExists(int id)
        {
            return _context.Attendances.Any(e => e.Id == id);
        }
    }
}