<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TblAnswers extends Model
{
    protected $table = 'tblanswers';
    protected $primaryKey = 'ID';
    protected $fillable = ['UserID', 'QuestionID', 'StudentAnswer', 'Correct', 'CourseID'];

    public function user()
    {
        return $this->belongsTo(TblUsers::class, 'UserID');
    }

    public function question()
    {
        return $this->belongsTo(TblQuestions::class, 'QuestionID');
    }
}
