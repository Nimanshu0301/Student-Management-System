<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblUsers extends Model
{
    use HasFactory;

    protected $table = 'tblusers';

    protected $fillable = [
        'FirstName',
        'LastName',
        'Email',
        'ID',
        'ContactNumber',
        'Password',
        'UserType',
        'code',
        'status',
    ];
}
