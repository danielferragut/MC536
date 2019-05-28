from faker import Faker
import random
fake = Faker('pt_BR')
arq = open('./dados.sql', 'w')

qtdePacientes = int(input("Digite a quantidade de dados para a tabela paciente: "))
qtdeMedicos = int(input("Digite a quantidade de dados para a tabela médicos: "))
qtdeConsultas = int(input("Digite a quantidade de dados para a tabela consultas: "))
qtdeExames = int(input("Digite a quantidade de dados para a tabela exames: "))
qtdeInternacoes = int(input("Digite a quantidade de dados para a tabela internacoes: "))
qtdeAtendimentos = int(input("Digite a quantidade de dados para a tabela atendimentos: "))
qtdeCirurgias = int(input("Digite a quantidade de dados para a tabela cirurgia: "))

tipos_sanguineos = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-']
tipos_alergias = ['Pó', 'Pelo de Gato', 'Não Possui', 'Cogumelo', 'Amendoim', 'Dipirona']

cpfsValidos = []
crmValidos = []
internacoesValidas = []
atendimentosValidos = []

#CreateTables:

arq.write("CREATE TABLE paciente (cpf VARCHAR(11) PRIMARY KEY, data_de_nascimento DATE, email VARCHAR(50) UNIQUE NOT NULL, nome VARCHAR(100) NOT NULL, telefone VARCHAR(20) NOT NULL, tipo_sanguineo VARCHAR(3) NOT NULL, sexo VARCHAR(10), alergias VARCHAR(30));\n")

arq.write("CREATE TABLE medico(crm VARCHAR(6) PRIMARY KEY,cpf VARCHAR (11) NOT NULL,especialização VARCHAR (50) NOT NULL,nome VARCHAR (100) NOT NULL,telefone VARCHAR (20) NOT NULL,data_de_nascimento DATE);\n")

arq.write("CREATE TABLE consulta(crm VARCHAR(6) REFERENCES medico,cpf VARCHAR(11) REFERENCES paciente,hora_da_consulta TIME (4) NOT NULL,sala VARCHAR (10) NOT NULL,data_da_consulta DATE NOT NULL,PRIMARY KEY (crm,cpf,data_da_consulta));\n")

arq.write("CREATE TABLE internacao(protocolo_internacao VARCHAR(50) PRIMARY KEY,data_intercao DATE NOT NULL,dias_internado INTEGER,leito VARCHAR (20) NOT NULL,quarto VARCHAR (8) NOT NULL,cpf VARCHAR(11) REFERENCES paciente);\n")

arq.write("CREATE TABLE pronto_socorro(protocolo_atendimento VARCHAR(50) PRIMARY KEY,data_atendimento DATE NOT NULL,tipo_de_socorro VARCHAR(50),cpf VARCHAR(11) REFERENCES paciente);\n")

arq.write("CREATE TABLE cirurgia(protocolo_cirurgia VARCHAR(50) PRIMARY KEY, hora_da_cirurgia TIME (4), data_da_cirurgia DATE NOT NULL,tipo_de_cirurgia VARCHAR(50),cpf VARCHAR(14) REFERENCES paciente, crm VARCHAR(6) references medico);\n\n")

arq.write("CREATE TABLE exame(protocolo_exame VARCHAR(50) PRIMARY KEY,data_do_exame DATE  NOT NULL,hora_do_exame TIME (4) NOT NULL,resultado VARCHAR (1000),tipo VARCHAR(50) NOT NULL,crm VARCHAR(6),cpf VARCHAR(11),data_da_consulta DATE,protocolo_internacao VARCHAR(50) REFERENCES internacao, protocolo_atendimento VARCHAR(50) REFERENCES pronto_socorro, FOREIGN KEY  (crm,cpf,data_da_consulta) references consulta);\n")

# Pacientes
for x in range(1, qtdePacientes + 1):
    cpf = str('{:0>11}'.format(random.randint(0, 99999999999)))
    cpfsValidos.append(cpf)
    data_de_nascimento = str(random.randint(1920, 2018)) + '-' + str('{:0>2}'.format(random.randint(1, 12))) + '-' + str('{:0>2}'.format(random.randint(1, 30))) 
    email = fake.email()
    nome = fake.name()
    telefone = str('{:0>8}'.format(random.randint(0, 99999999)))
    tipo_sanguineo = random.choice(tipos_sanguineos)
    sexo = random.choice(['Masculino', 'Feminino'])
    alergias = random.choice(tipos_alergias)
    
    values = 'INSERT INTO paciente VALUES (' + cpf + ', ' + '\'' + data_de_nascimento + '\'' + ', ' + '\'' + email + '\'' + ', ' + '\'' + nome + '\'' + ', ' + telefone + ', ' + '\'' + tipo_sanguineo + '\'' + ', ' + '\'' + sexo + '\'' + ', ' + '\'' + alergias + '\'' + ');\n'
    arq.write(values)

especializacoes = ['GO', 'Pediatra', 'Psiquiatra', 'Dermatologista', 'Cardiologista', 'Neurologista', 'Oftalmologista', 'Otorrinolaringologista']

arq.write('\n')

# Medicos
for x in range(1, qtdeMedicos + 1):
    CRM = str('{:0>6}'.format(x))
    crmValidos.append(CRM)
    cpf = str('{:0>11}'.format(random.randint(0, 99999999999)))
    especializacao = random.choice(especializacoes)
    nome = fake.name()
    telefone = str('{:0>8}'.format(random.randint(0, 99999999)))
    data_de_nascimento = str(random.randint(1920, 2018)) + '-' + str('{:0>2}'.format(random.randint(1, 12))) + '-' + str('{:0>2}'.format(random.randint(1, 28)))
    
    values = 'INSERT INTO medico VALUES (' + CRM + ', ' + cpf + ', ' + '\'' + especializacao + '\'' + ', ' + '\'' + nome + '\'' + ', ' + telefone + ', ' + '\'' + data_de_nascimento + '\'' + ');\n'
    arq.write(values)

arq.write('\n')

consultas = []

# Consultas
for x in range(1, qtdeConsultas + 1):
    cpf = random.choice(cpfsValidos)
    crm = random.choice(crmValidos)

    data_da_consulta = str(random.randint(1980, 2018)) + '-' + str('{:0>2}'.format(random.randint(1, 12))) + '-' + str('{:0>2}'.format(random.randint(1, 28)))
    hora = str('{:0>2}'.format(random.randint(0, 23))) + ':' + str('{:0>2}'.format(random.randint(0, 59))) + ':' + str('{:0>2}'.format(random.randint(0, 59))) 

    consultas.append((cpf, crm, data_da_consulta))
    
    sala = str('{:0>3}'.format(x))
    
    values = 'INSERT INTO consulta VALUES (' + crm + ', ' + cpf + ', ' + '\'' + hora + '\'' + ', ' + sala + ', \''+ data_da_consulta +'\');\n'
    arq.write(values)

arq.write('\n')

# Internacoes
for x in range(1, qtdeInternacoes + 1):

    protocolo_internacao = str('{:0>12}'.format(x))
    internacoesValidas.append(protocolo_internacao)
    dias_internacao = str('{:0>3}'.format(random.randint(1, 999)))
    data_internacao = str(random.randint(1980, 2018)) + '-' + str('{:0>2}'.format(random.randint(1, 12))) + '-' + str('{:0>2}'.format(random.randint(1, 28)))
    leito = str('{:0>20}'.format(random.randint(1, 99999999999999)))
    quarto = str('{:0>8}'.format(random.randint(1, 500)))
    
    cpf = random.choice(cpfsValidos)
    
    values = 'INSERT INTO internacao VALUES (' + protocolo_internacao + ', ' + '\'' + data_internacao + '\'' + ', ' + dias_internacao + ', ' + leito + ', ' + quarto + ', '  +cpf + ');\n'
    arq.write(values)

arq.write('\n')

tipos_socorro = ['Ambulatorial', 'Hospitalar']
# Atendimento
for x in range(1, qtdeAtendimentos + 1):

    protocolo_atendimento = str('{:0>12}'.format(x))
    atendimentosValidos.append(protocolo_atendimento)
    data_atendimento = str(random.randint(1980, 2018)) + '-' + str('{:0>2}'.format(random.randint(1, 12))) + '-' + str('{:0>2}'.format(random.randint(1, 28)))
    nome_medico = fake.name()
    tipo_de_socorro = random.choice(tipos_socorro)
    cpf = random.choice(cpfsValidos)
    
    values = 'INSERT INTO pronto_socorro VALUES (' + protocolo_atendimento + ', ' + '\'' + data_atendimento + '\', ' + '\'' + tipo_de_socorro + '\'' + ', ' + cpf + ');\n'
    arq.write(values)
arq.write('\n')

tipos_de_cirurgia = ['Biópsias : gânglios','Biópsias : muscular','Biópsias : pele','Biópsias : tireóide','Biópsias : hepática','Excisão de cistos sebáceos','Excisão de Granuloma de corpo estranho','Excisão de Pequenas lesões dérmicas','Hernioplastias : umbilical','Hernioplastias : epigástrica','Hernioplastias : inguinal','Hernioplastias : ventral(pequena)','Videolaparoscopias diagnósticas','Implante de Cateter','Hérnias umbilical','Vesicular/vídeo','Hérnia Inguinal','Lipomas',' etc.','Ginecologia','Vídeo-Histerioscopia','Vídeo-Laparoscopia','Mama-Biópsias','Mama-Exerese de abcessos','Mama-Drenagem de abcessos','Mama-Exerese de segmentos','Vulva : Biópsias','Vulva : Drenagem de Bartholimite','Vulva : Exerese de cisto de Bartholimite','Vulva : Drenagem de abcessos','Vestíbulo',' vagina : Exerese de massas e cistos','Vestíbulo',' vagina : Cauterização','Colo de Útero : Biopsia','Colo de Útero : Conização','Corpo do Útero : Curetagem semiótica','Abcesso de parede Abdominal','Abcesso de Glândula de Bartholin','Neurologia','EEG','EEG-Mapeamento','Polissonografia','Vídeo-EEG','Oftalmologia','Exérese de Pterigio','Exérese de Calázio','Facectomia','Hérnia de Iris','Recobrimento Conjuntival','Transplante de Córnea','Ptose palpebral','Dermatocálase','Dacriocistorinostomia','Correção de Entrópio e Ectrópio','Exérese de Tumores','Retinopexia','Crioterapia','Vitrectomia','Trabeculectomia','Viscocanalostomia','Correção cirúrgica de Estrabismo','Ortopedia','Cirurgia da mão','Tendinites em geral','Tumores de partes moles','Artroscopia do joelho','Redução de fraturas','Curativo Cirúrgicos','Exerese de corpo estranho','Exerese de cisto articulares','Exerese de próteses','Otorrinolaringologia','Otoplastia','C. Auris (Fístula pré-auricular)','Turbinectomia','Sinequias nasais','Redução de fraturas','Frenectomia','Cirurgia Pediátrica','Fimoses','Hérnia inguinal(uni e bilaterais)','Umbilical','Cistos-tireogross','Drenagem de abcessos','Hérnia Epigástrica','Biópsia de gânglios','Orquidopexias','Postectomias','Correção Cirúrgica de Hidroceles','Correção Cirúrgica de Varicoceles','Exereses : corpo estranho','Exereses : pólipo retal','Exereses : polidactilia não articulada','Frenotomia lingual (anquiloglossia)','Cirurgia Plástica e Reparadora','Nevus : cauterização de nevus','Nevus : Tumor basocelular','Nevus : corpo estranho subcutâneo','Nevus : nódulo fibrogênio','Exereses : cicatriz','Exereses : verruga','Exereses : cauterização de verruga','Cistos : hemifuso','Cistos : sinovial','Cistos : sebáceo','Cistos : auricular','Blefaroplastia','Lipomas','Cicatrizes','Tatuagem','Granuloma de lábio','Sutura de lobo de orelha','Orelha de Abano','Xantelasma','Quelóide','Tratamento cirúrgico de lóbulo bífido','Lipoenxertia','Debridamento em queimadura','Drenagens','Lipoaspiração','Onicectomia','Ginecomastia','Proctologia','Investigação Diagnóstica','Tratamento Endoscópico','Retossignoidoscopia rígida e flexível','Polipectomia','Ileocolonoscopia','Pós-operatório de câncer colorretal','Biópsias seriadas','Polipectomias endoscópicas','Esclerose de hemorróidas','Cirurgias Orificiais','Tratamento de Fissuras anais','Exerese de mamilos hemorroidários','Exerese de Plicomas anais','Fistulectomias superficiais','Exerese e cauterização de condilomas anais','Drenagem de abcessos anais','Exerese de trombop hemorroidário','Circlagem anal e Prolapso retal','Exerese de papilas anais hipertrofiadas','Ligadura elástica de hemorróidas','Tratamento de Hemorróidas com Infrared e congelação','Exerese de cisto pilomidal','Seguimento pós-operatório','Urologia','Biópsia de Próstata','Citoscopia','Postectomia','Frenoplastia','Meatoplastia','Urotomia interna','Cura cirúrgica : hidrocele','Cura cirúrgica : varicocele','Fixação de testículo','Cura cirúrgica : espermatocele','Orquiectomia','Epidiomectomia','Biópsia endoscópica de bexiga','Cateterismo uretral endoscópico','Colocação de Cateter duplo J','Nefrostomia de punção','Pielografia retógrada e arteriografia','Dilatação hidráulica de bexiga','Cauterização de condilomas','Biópsia de testículo e pelvis','Biópsia de pelvis','Vasectomia','Vascular','Varizes','Fístula arterio-venosa',]


# Cirurgia
for x in range(1, qtdeCirurgias + 1):

    protocolo_cirurgia = str('{:0>12}'.format(x))
    data_da_cirurgia = str(random.randint(1980, 2018)) + '-' + str('{:0>2}'.format(random.randint(1, 12))) + '-' + str('{:0>2}'.format(random.randint(1, 28)))
    tipo_de_cirurgia = random.choice(tipos_de_cirurgia)
    horario = str('{:0>2}'.format(random.randint(0, 23))) + ':' + str('{:0>2}'.format(random.randint(0, 59))) + ':' + str('{:0>2}'.format(random.randint(0, 59)))
    cpf = random.choice(cpfsValidos)
    crm = random.choice(crmValidos)
    
    values = 'INSERT INTO cirurgia VALUES (' + protocolo_cirurgia + ', ' + '\'' + horario + '\', ' + '\'' + data_da_cirurgia + '\', ' + '\'' + tipo_de_cirurgia + '\'' + ', ' + cpf +  ', ' + crm + ');\n'
    arq.write(values)
arq.write('\n')

exames = ['sangue', 'urina', 'fezes', 'espermograma', 'escarro', 'liquido cefalorraquidiano', 'liquido pleural']
origensExame = ['consulta', 'internação', 'atendimento']
# Exames
for x in range(1, qtdeExames + 1):
    
    protocolo_exame = str('{:0>12}'.format(x))
    data_exame = str(random.randint(1980, 2018)) + '-' + str('{:0>2}'.format(random.randint(1, 12))) + '-' + str('{:0>2}'.format(random.randint(1, 28)))
    horario = str('{:0>2}'.format(random.randint(0, 23))) + ':' + str('{:0>2}'.format(random.randint(0, 59))) + ':' + str('{:0>2}'.format(random.randint(0, 59)))
    tipo = random.choice(exames)
    origemDoExame = random.choice(origensExame)
    if origemDoExame == 'consulta':
        cpf, crm, hora = random.choice(consultas)
        protocolo_internacao = 'null'
        protocolo_atendimento = 'null'
        values = 'INSERT INTO exame(protocolo_exame,data_do_exame,hora_do_exame,tipo,cpf,crm,data_da_consulta) VALUES (' + protocolo_exame + ', ' + '\'' + data_exame + '\'' + ', ' + '\'' + horario + '\'' + ', ' + '\'' + tipo + '\'' + ', ' + cpf + ', ' + crm + ', ' + '\'' + hora + '\');\n'

    elif origemDoExame == 'internação':
        cpf, crm, hora = 'null','null', 'null'
        protocolo_internacao = random.choice(internacoesValidas)
        protocolo_atendimento = None
        values = 'INSERT INTO exame(protocolo_exame,data_do_exame,hora_do_exame,tipo,protocolo_internação) VALUES (' + protocolo_exame + ', ' + '\'' + data_exame + '\'' + ', ' + '\'' + horario + '\'' + ', ' + '\'' + tipo + '\'' + ', ' + protocolo_internacao + ');\n'

    else:
        cpf, crm, hora = 'null','null', 'null'
        protocolo_internacao = 'null'
        protocolo_atendimento = random.choice(atendimentosValidos)
        values = 'INSERT INTO exame(protocolo_exame,data_do_exame,hora_do_exame,tipo,protocolo_atendimento) VALUES (' + protocolo_exame + ', ' + '\'' + data_exame + '\'' + ', ' + '\'' + horario + '\'' + ', ' + '\'' + tipo + '\'' + ', ' + protocolo_atendimento + ');\n'
    arq.write(values)

arq.write('\n')

arq.close()
