<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class path extends Model
{
	protected $table = 'path_table';
    use HasFactory;

    public $timestamps = false;
}