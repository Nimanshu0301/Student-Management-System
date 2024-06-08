<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TblMarks extends Model
{
    protected $table = 'tblmarks';
    protected $primaryKey = 'ID';
    protected $fillable = ['CourseID', 'StudentID', 'TotalQuestions', 'TotalCorrects', 'Marks', 'InstructorResult', 'QAOResult'];
}
