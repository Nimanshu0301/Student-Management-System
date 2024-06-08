<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TblQuestions extends Model
{
    protected $table = 'tblquestions';
    protected $primaryKey = 'ID';
    protected $fillable = ['CourseID', 'Questions', 'Option1', 'Option2', 'Option3', 'Option4', 'Answer'];
}
