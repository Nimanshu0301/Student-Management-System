<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TblClass extends Model
{
    protected $table = 'tblclass';
    protected $primaryKey = 'ID';
    protected $fillable = ['ClassName', 'CourseID', 'Timings', 'Credits', 'Instructor', 'CourseType', 'Content', 'Approved'];
}
