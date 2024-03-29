import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import './cadastroUsuario.css'
import { Link, useNavigate } from "react-router-dom";
import User from '../../models/User'
import { cadastroUsuario } from '../../services/service';
import { toast } from 'react-toastify';


function CadastroUsuario() {

        let navigate = useNavigate();
        const [confirmarSenha,setConfirmarSenha] = useState<String>("")
        const [user, setUser] = useState<User>(
            {
                id: 0,
                nome: '',
                usuario: '',
                senha: '',
                foto: ''
            })
    
        const [userResult, setUserResult] = useState<User>(
            {
                id: 0,
                nome: '',
                usuario: '',
                senha: '',
                foto:''
            })
    
        useEffect(() => {
            if (userResult.id != 0) {
                navigate("/login")
            }
        }, [userResult])
    
    
        function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
            setConfirmarSenha(e.target.value)
        }
    
    
        function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
    
        }
        async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
            e.preventDefault()
            if(confirmarSenha == user.senha){
            cadastroUsuario(`/usuario/cadastrar`, user, setUserResult)
            toast.success('Usuario cadastrado com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
                });
            }else{
                toast.error('Dados inconsistentes. Favor verificar as informações de cadastro.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                    });
            }
        }
    return (

        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='texto2'>Cadastre-se</Typography>
                        <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='nome' variant="outlined" name='nome' margin='normal' fullWidth />
                        <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='usuário' variant="outlined" name='usuario' margin='normal' fullWidth />
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant="outlined" name='senha' type='password' margin='normal' fullWidth />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarsenha' label='confirmarsenha' variant="outlined" name='confirmarsenha' margin='normal' type='password' fullWidth />

                        <Box marginTop={2} textAlign='center'>
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant="contained" color="secondary" className='btnCancelar'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant="contained" color="primary">
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    )
}

export default CadastroUsuario;